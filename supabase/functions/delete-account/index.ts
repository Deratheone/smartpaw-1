
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify the user is authenticated
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the JWT token
    const token = authHeader.replace('Bearer ', '')
    
    // Verify the user's JWT and get user info
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user) {
      throw new Error('Invalid or expired token')
    }

    console.log(`Processing account deletion for user: ${user.id}`)

    // Delete user profile and related data
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .delete()
      .eq('id', user.id)

    if (profileError) {
      console.error('Error deleting profile:', profileError)
    }

    // Delete service provider data if exists
    const { error: providerError } = await supabaseClient
      .from('service_providers')
      .delete()
      .eq('id', user.id)

    if (providerError) {
      console.error('Error deleting service provider:', providerError)
    }

    // Delete all services created by the user
    await Promise.all([
      supabaseClient.from('pet_boarding_services').delete().eq('provider_id', user.id),
      supabaseClient.from('pet_grooming_services').delete().eq('provider_id', user.id),
      supabaseClient.from('pet_monitoring_services').delete().eq('provider_id', user.id)
    ])

    // Finally, delete the auth user (this will cascade to bookings due to foreign key)
    const { error: deleteError } = await supabaseClient.auth.admin.deleteUser(user.id)
    
    if (deleteError) {
      throw new Error(`Failed to delete user account: ${deleteError.message}`)
    }

    console.log(`Successfully deleted account for user: ${user.id}`)

    return new Response(
      JSON.stringify({ success: true, message: 'Account deleted successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error in delete-account function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'An unexpected error occurred' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

// Helper function to create Supabase client
function createClient(supabaseUrl: string, supabaseKey: string) {
  return new (await import('https://esm.sh/@supabase/supabase-js@2')).createClient(
    supabaseUrl,
    supabaseKey
  )
}
