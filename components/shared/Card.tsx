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
          <DeleteConfirmation serviceId={service._id}/>
        </div>
      )}
      <Link
        href={`/services/${service._id}`}
        className="flex flex-col gap-3 min-h-[230px] p-5 md:gap-4"
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {service.isAvailable ? "Available" : "Not Available"}
            </span>
            <p className="p-semibold-14 w-min rounded-full px-4 py-1 bg-grey-500/10 text-grey-500">
              {service.category.categoryName}
            </p>
          </div>
        )}
        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(service.createdAt).dateOnly}
        </p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {service.serviceTitle}
        </p>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {service.createdBy.firstName} {service.createdBy.lastName}
          </p>
          {hasOrderLink && (
            <Link
              href={`/orders?serviceId=${service._id}`}
              className="flex gap-2"
            >
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;
