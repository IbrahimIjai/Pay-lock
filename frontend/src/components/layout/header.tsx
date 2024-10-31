"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Lock, EllipsisVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CustomConnectButton from "../wagmi/custom-connect-button";

// Define the navigation interface
interface NavigationItem {
	name: string;
	href: string;
	description?: string;
}

// Navigation links array
const navigation: NavigationItem[] = [
	{
		name: "Home",
		href: "/",
		description: "Return to homepage",
	},
	{
		name: "Dashboard",
		href: "/dashboard",
		description: "View your dashboard",
	},
	{
		name: "Transactions",
		href: "/transactions",
		description: "View your transactions",
	},
	{
		name: "Settings",
		href: "/settings",
		description: "Manage your account settings",
	},
];

// Social links configuration
const socialLinks = [
	{
		name: "Twitter",
		href: "https://twitter.com/paylock",
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg width="20" height="20" viewBox="0 0 24 24" {...props}>
				<path
					fill="currentColor"
					d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
				/>
			</svg>
		),
	},
	{
		name: "Telegram",
		href: "https://t.me/paylock",
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg width="20" height="20" viewBox="0 0 15 15" {...props}>
				<path
					d="M14.5 1.5L0.5 6.5L4.5 8.5L10.5 4.5L6.5 9.5L12.5 13.5L14.5 1.5Z"
					stroke="currentColor"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		name: "Discord",
		href: "https://discord.gg/paylock",
		icon: (props: React.SVGProps<SVGSVGElement>) => (
			<svg width="20" height="20" viewBox="0 0 15 15" {...props}>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M5.07451 1.82584C5.03267 1.81926 4.99014 1.81825 4.94803 1.82284C4.10683 1.91446 2.82673 2.36828 2.07115 2.77808C2.02106 2.80525 1.97621 2.84112 1.93869 2.88402C1.62502 3.24266 1.34046 3.82836 1.11706 4.38186C0.887447 4.95076 0.697293 5.55032 0.588937 5.98354C0.236232 7.39369 0.042502 9.08728 0.0174948 10.6925C0.0162429 10.7729 0.0351883 10.8523 0.0725931 10.9234C0.373679 11.496 1.02015 12.027 1.66809 12.4152C2.32332 12.8078 3.08732 13.1182 3.70385 13.1778C3.85335 13.1922 4.00098 13.1358 4.10282 13.0255C4.2572 12.8581 4.5193 12.4676 4.71745 12.1643C4.80739 12.0267 4.89157 11.8953 4.95845 11.7901C5.62023 11.9106 6.45043 11.9801 7.50002 11.9801C8.54844 11.9801 9.37796 11.9107 10.0394 11.7905C10.1062 11.8957 10.1903 12.0269 10.2801 12.1643C10.4783 12.4676 10.7404 12.8581 10.8947 13.0255C10.9966 13.1358 11.1442 13.1922 11.2937 13.1778C11.9102 13.1182 12.6742 12.8078 13.3295 12.4152C13.9774 12.027 14.6239 11.496 14.925 10.9234C14.9624 10.8523 14.9813 10.7729 14.9801 10.6925C14.9551 9.08728 14.7613 7.39369 14.4086 5.98354C14.3003 5.55032 14.1101 4.95076 13.8805 4.38186C13.6571 3.82836 13.3725 3.24266 13.0589 2.88402C13.0214 2.84112 12.9765 2.80525 12.9264 2.77808C12.1708 2.36828 10.8907 1.91446 10.0495 1.82284C10.0074 1.81825 9.96489 1.81926 9.92305 1.82584C9.71676 1.85825 9.5391 1.96458 9.40809 2.06355C9.26977 2.16804 9.1413 2.29668 9.0304 2.42682C8.86968 2.61544 8.71437 2.84488 8.61428 3.06225C8.27237 3.03501 7.90138 3.02 7.5 3.02C7.0977 3.02 6.72593 3.03508 6.38337 3.06244C6.28328 2.84501 6.12792 2.61549 5.96716 2.42682C5.85626 2.29668 5.72778 2.16804 5.58947 2.06355C5.45846 1.96458 5.2808 1.85825 5.07451 1.82584Z"
					fill="currentColor"
				/>
			</svg>
		),
	},
];

export default function Header() {
	const pathname = usePathname();

	return (
		<header className="px-6 py-2 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center">
				<div className="mr-12">
					<Link href="/" className="flex items-center space-x-2">
						<Lock className="h-6 w-6 text-primary" />
						<span className="font-bold text-xl">PayLock</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
					{navigation.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"transition-colors hover:text-foreground/80",
								pathname === item.href
									? "text-foreground"
									: "text-foreground/60",
							)}>
							{item.name}
						</Link>
					))}
				</nav>

				<div className="ml-auto flex items-center space-x-4">
					<CustomConnectButton />
					<div className="md:hidden">
						<MobileNav />
					</div>
				</div>
			</div>
		</header>
	);
}

function MobileNav() {
	const router = useRouter();
	const pathname = usePathname();

	const handleNavigate = (href: string) => {
		router.push(href);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="border-primary">
					<EllipsisVertical className="h-5 w-5 text-primary" />
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="w-80 p-0">
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between p-4 border-b">
						<Link href="/" className="flex items-center space-x-2">
							<Lock className="h-5 w-5 text-primary" />
							<span className="font-bold">PayLock</span>
						</Link>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<X className="h-5 w-5" />
							</Button>
						</SheetTrigger>
					</div>

					<nav className="flex-grow overflow-y-auto p-4 space-y-2">
						{navigation.map((item) => (
							<Button
								key={item.href}
								variant="ghost"
								className={cn(
									"w-full justify-start",
									pathname === item.href
										? "bg-primary/10 text-primary"
										: "text-foreground/60 hover:text-foreground hover:bg-primary/5",
								)}
								onClick={() => handleNavigate(item.href)}>
								{item.name}
							</Button>
						))}
					</nav>

					<div className="flex justify-center gap-6 p-4 border-t">
						{socialLinks.map((social) => (
							<Link
								key={social.name}
								href={social.href}
								className="text-foreground/60 hover:text-foreground transition-colors"
								target="_blank"
								rel="noopener noreferrer">
								<span className="sr-only">{social.name}</span>
								<social.icon aria-hidden="true" />
							</Link>
						))}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
