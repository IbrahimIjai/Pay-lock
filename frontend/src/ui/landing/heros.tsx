import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Shield, Wallet, Receipt, QrCode } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
				<div className="container mx-auto text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6">
						Secure Payments with <span className="text-primary">PYUSD</span>
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Generate invoices, accept PYUSD payments, and manage digital
						services with our secure payment protocol.
					</p>
					<div className="flex gap-4 justify-center">
						<Link href="/vendor/register">
							<Button size="lg">
								Become a Vendor
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>
						<Link href="/vendors">
							<Button size="lg" variant="outline">
								Browse Services
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 px-4">
				<div className="container mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Card>
							<CardHeader>
								<Shield className="h-12 w-12 text-primary mb-4" />
								<CardTitle>Secure Escrow</CardTitle>
								<CardDescription>
									Protected payments with automated escrow release for
									service-based transactions.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Receipt className="h-12 w-12 text-primary mb-4" />
								<CardTitle>Smart Invoicing</CardTitle>
								<CardDescription>
									Generate and share professional invoices with built-in payment
									tracking.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Wallet className="h-12 w-12 text-primary mb-4" />
								<CardTitle>PYUSD Payments</CardTitle>
								<CardDescription>
									Accept payments in PYUSD with real-time price updates and
									automatic conversion.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-20 px-4 bg-muted/50">
				<div className="container mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Receipt className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">1. Create Service</h3>
							<p className="text-muted-foreground">
								List your service or product with pricing details
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<QrCode className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">2. Share QR Code</h3>
							<p className="text-muted-foreground">
								Generate unique QR codes for easy access
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Wallet className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">3. Receive Payment</h3>
							<p className="text-muted-foreground">
								Accept PYUSD payments securely
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Shield className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold mb-2">4. Release Service</h3>
							<p className="text-muted-foreground">
								Automatic or manual release of services
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
