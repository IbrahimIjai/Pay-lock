"use client";

import { useAppKit } from "@reown/appkit/react";

import React from "react";
import { Button } from "../ui/button";
import { useAccount } from "wagmi";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { shortenAddress } from "@/lib/utils";

export default function CustomConnectButton() {
	const { open } = useAppKit();
	const { isConnected, address, isConnecting } = useAccount();

	const handleClick = () => {
		open({ view: isConnected ? "Account" : "Connect" });
	};
	return (
		<Button
			variant={isConnected ? "outline" : "default"}
			onClick={handleClick}
			className="flex items-center gap-2">
			{isConnecting ? (
				<>Connecting...</>
			) : isConnected ? (
				<>
					{shortenAddress(address??"")}
					<ChevronDownIcon className="h-4 w-4" />
				</>
			) : (
				"Connect Wallet"
			)}
		</Button>
	);
}
