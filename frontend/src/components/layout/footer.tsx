import { Lock } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t bg-background max-w-7xl mx-auto px-6">
			<div className="container py-8 md:py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Lock className="h-6 w-6 text-primary" />
							<span className="font-bold text-xl">PayLock</span>
						</div>
						<p className="text-sm text-muted-foreground">
							Secure payments and service delivery with PYUSD
						</p>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Product</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="/services"
									className="text-muted-foreground hover:text-foreground">
									Services
								</Link>
							</li>
							<li>
								<Link
									href="/vendors"
									className="text-muted-foreground hover:text-foreground">
									Vendors
								</Link>
							</li>
							<li>
								<Link
									href="/pricing"
									className="text-muted-foreground hover:text-foreground">
									Pricing
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Resources</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="/docs"
									className="text-muted-foreground hover:text-foreground">
									Documentation
								</Link>
							</li>
							<li>
								<Link
									href="/api"
									className="text-muted-foreground hover:text-foreground">
									API
								</Link>
							</li>
							<li>
								<Link
									href="/support"
									className="text-muted-foreground hover:text-foreground">
									Support
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Legal</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="/privacy"
									className="text-muted-foreground hover:text-foreground">
									Privacy
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-muted-foreground hover:text-foreground">
									Terms
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
					<p>
						&copy; {new Date().getFullYear()} PayLock Protocol. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
