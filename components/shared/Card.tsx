import { IService } from "@/lib/database/models/service.model";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardpropsType = {
  service: IService;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ service, hasOrderLink, hidePrice }: CardpropsType) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isServiceCreated = userId === service.createdBy._id.toString();
  return (
    <div
      className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col 
    overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]"
    >
      <Link
        href={`/services/${service._id}`}
        style={{ backgroundImage: `url(${service.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-center text-grey-500"
      />
      {isServiceCreated && !hidePrice && (
        <div className="absolute top-2 flex flex-col rounded-xl right-2 bg-white p-3 shadow-sm transition-all">
          <Link href={`/services/${service._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation serviceId={service._id} />
        </div>
      )}
      <div className="flex flex-col gap-2 min-h-[230px] p-5 md:gap-3">
        {!hidePrice && (
          <div className="flex gap-2">
            <span
              className={`p-semibold-14 w-min rounded-full px-4 py-1 ${
                service.isAvailable
                  ? "bg-green-100 text-green-60"
                  : "bg-red-100 text-red-400"
              }`}
            >
              {service.isAvailable ? "Available" : "Booked"}
            </span>

            <p className="p-semibold-14 w-min rounded-full px-4 py-1 bg-grey-500/10 text-grey-500 line-clamp-1">
              {service.category.categoryName}
            </p>
          </div>
        )}
        <p className="p-medium-14 md:p-medium-16 text-grey-500">
          {formatDateTime(service.createdAt).dateOnly}
        </p>
        <Link href={`/services/${service._id}`}>
          <p className="p-medium-14 md:p-medium-18 line-clamp-2 flex-1 text-black">
            {service.serviceTitle}
          </p>
        </Link>

        {!hidePrice && (
          <p className="p-medium-14 md:p-medium-16 text-primary-500">
            Price: ₹{service.price}
          </p>
        )}
        <div>
          <p className="text-grey-500">
            <span className="p-medium-14 md:p-medium-16 ">
              Location:{' '}
            </span>
            <span className="p-medium-14 md:p-medium-16">
              {service.location}
            </span>
          </p>
        </div>
        <div className="flex-col w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {service.createdBy.firstName} {service.createdBy.lastName}
          </p>
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            Phone: {service.phoneNumber}
          </p>
          {hasOrderLink && (
            <Link
              href={`/orders?serviceId=${service._id}`}
              className="flex gap-2"
            >
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="arrow"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
