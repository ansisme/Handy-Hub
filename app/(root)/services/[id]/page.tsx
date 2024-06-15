import { getRelatedServicesByCategory, getServiceById } from "@/lib/actions/service.action";
import { SearchParamProps } from "@/types";
import React from "react";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import Collection from "@/components/shared/Collection";
import CheckoutButton from "@/components/shared/CheckoutButton";

const ServiceDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const service = await getServiceById(id);
  const relatedServices = await getRelatedServicesByCategory({
    categoryId: service.category._id,
    serviceId: service._id,
    page: searchParams.page as string
  });
  return (
    <>
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={service.imageUrl}
          alt="service image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{service.serviceTitle}</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {service.isAvailable ? "Available" : "Not Available"}
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {service.category.categoryName}
                </p>
              </div>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                {" "}
                <span className="text-primary-500">
                  {service.createdBy.firstName} {service.createdBy.lastName}
                </span>
              </p>
            </div>
          </div>
          {/*  Checkout button */}
          <CheckoutButton service={service} />
          <div className="flex flex-col gap-5 ">
            <div className="flex gap-2 md:gap-3">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calender"
                width={32}
                height={32}
              />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>{formatDateTime(service.createdAt).dateOnly}</p>
              </div>
            </div>
            <div className="p-regular-20 flex items-center gap-3">
              <Image
                src="/assets/icons/location.svg"
                alt="location"
                width={32}
                height={32}
              />
              <p className="p-medium-16 lg:p-regular-20">{service.location}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What I offer for this service?</p>
            <p className="p-medium-16 lg:p-regular-18">{service.description}</p>
            {/* <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{service.url}</p> */}
          </div>
        </div>
      </div>
    </section>
    {/* Related services with the same category*/}
    <section className="wrapper flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold ">Related Services</h2>
      <Collection
          data={relatedServices?.data}
          emptyTitle="No services found"
          emptyStateSubtext="Please check back later"
          collectionType="All_Services"
          limit={6}
          page={1}
          totalPages={2}
        />
    </section>
    </>
  );
};

export default ServiceDetails;