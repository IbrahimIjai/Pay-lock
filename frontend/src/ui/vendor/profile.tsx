"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, DollarSign } from "lucide-react";
import Link from "next/link";

function ProfileMain() {
	const params = useParams();

	console.log({ params });
	const vendorId = params.vendor as string;

	// Mock data - replace with actual data fetching
	const vendorServices = [
		{
			id: 1,
			name: "Website Development",
			price: 1500,
			description: "Custom website development",
		},
		{
			id: 2,
			name: "Logo Design",
			price: 300,
			description: "Professional logo design",
		},
	];

	const analytics = {
		totalSales: "$5,200",
		totalCustomers: 28,
		activeServices: 5,
	};
	return (
		<div className="container py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Vendor Profile</h1>
				<p className="text-muted-foreground">
					{vendorId.slice(0, 6)}...{vendorId.slice(-4)}
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-3 mb-8">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Sales</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{analytics.totalSales}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Customers
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{analytics.totalCustomers}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Services
						</CardTitle>
						<BarChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{analytics.activeServices}</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{vendorServices.map((service) => (
					<Card key={service.id}>
						<CardHeader>
							<CardTitle>{service.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								{service.description}
							</p>
							<p className="text-2xl font-bold mb-4">${service.price}</p>
							<Link href={`/${vendorId}/${service.id}`}>
								<Button className="w-full">View Details</Button>
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

export default ProfileMain;
