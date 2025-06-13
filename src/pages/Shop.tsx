
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Star, ShoppingCart, Filter } from "lucide-react";
import { SEO } from "@/components/SEO";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for products
const products = [
  {
    id: 1,
    name: "Premium Dry Dog Food",
    category: "food",
    petType: "dog",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 29.99,
    rating: 4.8,
    reviewCount: 156,
    description: "High-quality protein and nutritionally dense formula for adult dogs."
  },
  {
    id: 2,
    name: "Interactive Cat Toy",
    category: "toys",
    petType: "cat",
    image: "https://images.unsplash.com/photo-1554576575-a4e7b6e8409d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 14.95,
    rating: 4.5,
    reviewCount: 89,
    description: "Stimulating toy that keeps cats engaged and active."
  },
  {
    id: 3,
    name: "Adjustable Dog Collar",
    category: "accessories",
    petType: "dog",
    image: "https://images.unsplash.com/photo-1576466833108-083705deeb5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 18.50,
    rating: 4.7,
    reviewCount: 124,
    description: "Comfortable, durable collar made from eco-friendly materials."
  },
  {
    id: 4,
    name: "Cat Litter Box",
    category: "supplies",
    petType: "cat",
    image: "https://images.unsplash.com/photo-1577099881949-0d21a15b55aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 32.99,
    rating: 4.3,
    reviewCount: 76,
    description: "Easy-to-clean litter box with odor control and privacy hood."
  },
  {
    id: 5,
    name: "Dog Grooming Brush",
    category: "grooming",
    petType: "dog",
    image: "https://images.unsplash.com/photo-1555708571-9da51a4102f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 12.99,
    rating: 4.6,
    reviewCount: 98,
    description: "Removes loose fur and detangles coats of all types."
  },
  {
    id: 6,
    name: "Cat Dental Treats",
    category: "food",
    petType: "cat",
    image: "https://images.unsplash.com/photo-1579704043857-64da49656124?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 8.95,
    rating: 4.2,
    reviewCount: 67,
    description: "Crunchy treats that help reduce plaque and tartar."
  },
  {
    id: 7,
    name: "Portable Dog Water Bottle",
    category: "supplies",
    petType: "dog",
    image: "https://images.unsplash.com/photo-1594767240350-021a67b19477?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 15.99,
    rating: 4.9,
    reviewCount: 112,
    description: "Convenient water dispenser for dogs on walks or travel."
  },
  {
    id: 8,
    name: "Cat Scratching Post",
    category: "furniture",
    petType: "cat",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 39.99,
    rating: 4.4,
    reviewCount: 83,
    description: "Sturdy scratching post that protects furniture and keeps cats happy."
  },
];

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPetType, setSelectedPetType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortBy, setSortBy] = useState("featured");
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

  const addToCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPetType = !selectedPetType || product.petType === selectedPetType;
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPetType && matchesPriceRange;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    // Default is "featured" which we'll leave as is for the mock
    return 0;
  });

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const categories = [
    { value: "food", label: "Food" },
    { value: "toys", label: "Toys" },
    { value: "accessories", label: "Accessories" },
    { value: "supplies", label: "Supplies" },
    { value: "grooming", label: "Grooming" },
    { value: "furniture", label: "Furniture" },
  ];

  const petTypes = [
    { value: "dog", label: "Dogs" },
    { value: "cat", label: "Cats" },
    { value: "bird", label: "Birds" },
    { value: "fish", label: "Fish" },
    { value: "small_pet", label: "Small Pets" },
  ];

  return (
    <Layout>
      <SEO 
        title="Pet Shop - Food, Toys & Accessories | SmartPaw"
        description="Shop premium pet supplies including food, toys, accessories, and health products. Quality products for dogs, cats, and small pets with fast delivery."
        keywords="pet food, dog toys, cat accessories, pet supplies, pet health products, dog food, cat food, pet toys online"
        url="https://smartpaw.vercel.app/shop"
      />
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Pet Shop</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Shop quality food, toys, accessories, and more for your furry friends.
            </p>
          </div>

          {/* Search and Sort Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="hidden md:flex">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>
                      Narrow down products to find exactly what you're looking for.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Category</h3>
                      <div className="space-y-3">
                        {categories.map((category) => (
                          <div key={category.value} className="flex items-center">
                            <Checkbox
                              id={`category-${category.value}`}
                              checked={selectedCategory === category.value}
                              onCheckedChange={(checked) => {
                                setSelectedCategory(checked ? category.value : null);
                              }}
                            />
                            <label
                              htmlFor={`category-${category.value}`}
                              className="ml-2 text-gray-700"
                            >
                              {category.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-3">Pet Type</h3>
                      <div className="space-y-3">
                        {petTypes.map((petType) => (
                          <div key={petType.value} className="flex items-center">
                            <Checkbox
                              id={`pet-${petType.value}`}
                              checked={selectedPetType === petType.value}
                              onCheckedChange={(checked) => {
                                setSelectedPetType(checked ? petType.value : null);
                              }}
                            />
                            <label
                              htmlFor={`pet-${petType.value}`}
                              className="ml-2 text-gray-700"
                            >
                              {petType.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-3">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 50]}
                          max={100}
                          step={1}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="my-6"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedPetType(null);
                        setPriceRange([0, 50]);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Filter Sidebar - Visible on desktop */}
            <div className="hidden md:block bg-white p-6 rounded-lg shadow-sm h-fit">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Filters</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Category</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.value} className="flex items-center">
                      <Checkbox
                        id={`sidebar-category-${category.value}`}
                        checked={selectedCategory === category.value}
                        onCheckedChange={(checked) => {
                          setSelectedCategory(checked ? category.value : null);
                        }}
                      />
                      <label
                        htmlFor={`sidebar-category-${category.value}`}
                        className="ml-2 text-gray-700"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Pet Type</h3>
                <div className="space-y-3">
                  {petTypes.map((petType) => (
                    <div key={petType.value} className="flex items-center">
                      <Checkbox
                        id={`sidebar-pet-${petType.value}`}
                        checked={selectedPetType === petType.value}
                        onCheckedChange={(checked) => {
                          setSelectedPetType(checked ? petType.value : null);
                        }}
                      />
                      <label
                        htmlFor={`sidebar-pet-${petType.value}`}
                        className="ml-2 text-gray-700"
                      >
                        {petType.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 50]}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <Button
                className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedPetType(null);
                  setPriceRange([0, 50]);
                }}
              >
                Reset Filters
              </Button>
            </div>

            {/* Products Grid */}
            <div className="md:col-span-2 lg:col-span-3">
              {/* Mobile Filter Button */}
              <div className="flex justify-between items-center mb-4 md:hidden">
                <p className="text-gray-700">{sortedProducts.length} products</p>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Products</SheetTitle>
                      <SheetDescription>
                        Narrow down products to find exactly what you're looking for.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Category</h3>
                        <div className="space-y-3">
                          {categories.map((category) => (
                            <div key={category.value} className="flex items-center">
                              <Checkbox
                                id={`mobile-category-${category.value}`}
                                checked={selectedCategory === category.value}
                                onCheckedChange={(checked) => {
                                  setSelectedCategory(checked ? category.value : null);
                                }}
                              />
                              <label
                                htmlFor={`mobile-category-${category.value}`}
                                className="ml-2 text-gray-700"
                              >
                                {category.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Pet Type</h3>
                        <div className="space-y-3">
                          {petTypes.map((petType) => (
                            <div key={petType.value} className="flex items-center">
                              <Checkbox
                                id={`mobile-pet-${petType.value}`}
                                checked={selectedPetType === petType.value}
                                onCheckedChange={(checked) => {
                                  setSelectedPetType(checked ? petType.value : null);
                                }}
                              />
                              <label
                                htmlFor={`mobile-pet-${petType.value}`}
                                className="ml-2 text-gray-700"
                              >
                                {petType.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Price Range</h3>
                        <div className="px-2">
                          <Slider
                            defaultValue={[0, 50]}
                            max={100}
                            step={1}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="my-6"
                          />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white"
                        onClick={() => {
                          setSelectedCategory(null);
                          setSelectedPetType(null);
                          setPriceRange([0, 50]);
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                        <div className="flex items-center">
                          <Star className="text-yellow-400 fill-yellow-400 h-4 w-4" />
                          <span className="ml-1 text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        <Button 
                          size="sm"
                          className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white"
                          onClick={() => addToCart(product.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-700">No products found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Shopping Cart - Fixed at bottom of screen */}
          {cart.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
              <div className="container mx-auto">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShoppingCart className="text-smartpaw-purple h-5 w-5 mr-2" />
                    <span className="font-medium text-gray-900">
                      {cart.reduce((total, item) => total + item.quantity, 0)} items | ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline">View Cart</Button>
                    <Button className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white">
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
