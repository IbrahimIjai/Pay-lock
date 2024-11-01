"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Clock } from "lucide-react";

interface Service {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	isEscrow: boolean;
	estimatedTime: string;
	vendor: {
		name: string;
		address: string;
		rating: number;
	};
}

// Mock data - replace with actual data fetching
const services: Service[] = [
	{
		id: 1,
		name: "Website Development",
		description: "Custom website development with modern technologies",
		price: 1500,
		category: "Development",
		isEscrow: true,
		estimatedTime: "2-3 weeks",
		vendor: {
			name: "TechPro Solutions",
			address: "0x123...",
			rating: 4.8,
		},
	},
	{
		id: 2,
		name: "Logo Design",
		description: "Professional logo design with unlimited revisions",
		price: 300,
		category: "Design",
		isEscrow: true,
		estimatedTime: "3-5 days",
		vendor: {
			name: "Creative Studio",
			address: "0x456...",
			rating: 4.9,
		},
	},
	// Add more mock services...
];

export default function AllServicesLists() {
	const [searchTerm, setSearchTerm] = useState("");
	const [category, setCategory] = useState("all");
	const [priceRange, setPriceRange] = useState("all");

	const filteredServices = services.filter((service) => {
		const matchesSearch =
			service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			service.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = category === "all" || service.category === category;
		const price = service.price;
		const matchesPrice =
			priceRange === "all" ||
			(priceRange === "under-100" && price < 100) ||
			(priceRange === "100-500" && price >= 100 && price <= 500) ||
			(priceRange === "over-500" && price > 500);

		return matchesSearch && matchesCategory && matchesPrice;
	});

	return (
		<div className="container py-8">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
				<h1 className="text-3xl font-bold">Available Services</h1>
				<div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
					<div className="relative flex-1 md:w-64">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="Search services..."
							className="pl-9"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<Select value={category} onValueChange={setCategory}>
						<SelectTrigger className="w-full md:w-[180px]">
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							<SelectItem value="Development">Development</SelectItem>
							<SelectItem value="Design">Design</SelectItem>
							<SelectItem value="Marketing">Marketing</SelectItem>
						</SelectContent>
					</Select>
					<Select value={priceRange} onValueChange={setPriceRange}>
						<SelectTrigger className="w-full md:w-[180px]">
							<SelectValue placeholder="Price Range" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Prices</SelectItem>
							<SelectItem value="under-100">Under $100</SelectItem>
							<SelectItem value="100-500">$100 - $500</SelectItem>
							<SelectItem value="over-500">Over $500</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredServices.map((service) => (
					<Card key={service.id} className="flex flex-col">
						<CardHeader>
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="mb-2">{service.name}</CardTitle>
									<div className="flex items-center space-x-2 mb-2">
										<span className="text-sm text-muted-foreground">
											{service.vendor.name}
										</span>
										<span className="text-sm text-yellow-500">
											★ {service.vendor.rating}
										</span>
									</div>
								</div>
								<Badge variant={service.isEscrow ? "default" : "secondary"}>
									{service.isEscrow ? "Escrow" : "Direct"}
								</Badge>
							</div>
						</CardHeader>
						<CardContent className="flex-1">
							<p className="text-muted-foreground mb-4">
								{service.description}
							</p>
							<div className="flex items-center space-x-4 text-sm">
								<div className="flex items-center">
									<Shield className="h-4 w-4 mr-1 text-primary" />
									<span>{service.category}</span>
								</div>
								<div className="flex items-center">
									<Clock className="h-4 w-4 mr-1 text-primary" />
									<span>{service.estimatedTime}</span>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between items-center border-t pt-4">
							<span className="text-2xl font-bold">${service.price}</span>
							<Button>Generate Invoice</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			{filteredServices.length === 0 && (
				<div className="text-center py-12">
					<p className="text-muted-foreground">
						No services found matching your criteria.
					</p>
				</div>
			)}
		</div>
	);
}
