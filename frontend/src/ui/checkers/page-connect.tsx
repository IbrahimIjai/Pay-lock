"use client";

import { FC } from "react";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Button, ButtonProps } from "@/components/ui/button";

const PageConnectChecker: FC<ButtonProps> = ({ children, ...props }) => {
	const isMounted = useIsMounted();
	const { open } = useAppKit();
	const { isDisconnected, isConnecting, isReconnecting } = useAccount();

	if (!isMounted)
		return (
			<Button {...props}>
				<div className="h-[1ch]" />
			</Button>
		);

	if (isConnecting || isReconnecting) {
		return (
			<div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
				<h2 className="text-2xl font-bold">Connect Wallet to Continue</h2>
				<Button disabled {...props}>
					Connecting...
				</Button>
			</div>
		);
	}

	if (isDisconnected)
		return (
			<div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
				<h2 className="text-2xl font-bold">Connect Wallet to Continue</h2>
				<Button
					onClick={() => open({ view: "Connect" })}
					className="w-full"
					variant="secondary">
					Connect Wallet
				</Button>
			</div>
		);

	return <>{children}</>;
};

export { PageConnectChecker };
