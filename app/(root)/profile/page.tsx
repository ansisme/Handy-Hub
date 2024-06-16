import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getOrdersByUser } from "@/lib/actions/order.action";
import { getServicesByUser } from "@/lib/actions/service.action";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Profile = async ({searchParams} : SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const ordersPage = Number(searchParams?.ordersPage || 1);
  const servicesPage = Number(searchParams?.servicesPage || 1);
  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedServices = orders?.data.map((order: IOrder) => order.service) || [];
  const offeredServices = await getServicesByUser({ userId, page: servicesPage });
  return (
    <>
      {/* Hired Services */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex justify-center items-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Hired Services</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#services">
              Discover More Services
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedServices}
          emptyTitle="You have not hired any services yet"
          emptyStateSubtext="Explore our services and hire a professional today!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Provided Services */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex justify-center items-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Services</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/services/create" className="">
              Create a New Service
            </Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={offeredServices?.data}
          emptyTitle="You have not provided any services yet"
          emptyStateSubtext="Create a new service and start earning today!"
          collectionType="Services_Offered"
          limit={6}
          page={servicesPage}
          urlParamName="servicesPage"
          totalPages={offeredServices?.totalPages}
        />
      </section>
    </>
  );
};

export default Profile;
