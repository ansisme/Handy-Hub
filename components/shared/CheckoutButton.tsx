"use client";

import { IService } from "@/lib/database/models/service.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ service }: { service: IService }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const serviceUnavailable = !service.isAvailable; //think - booked
  return (
    <div className="flex items-center gap-3">
      {serviceUnavailable ? (
        <p className="p-2 text-red-400">
          Sorry, this service is currently unavailable as it has already been
          booked. Please check back later or explore our other available
          services!
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
                <Link href="/sign-in">
                    Sign in to book this service
                </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout service={service} userId={userId}/>
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
