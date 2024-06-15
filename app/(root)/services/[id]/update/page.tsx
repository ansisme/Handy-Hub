import ServiceForm from "@/components/shared/ServiceForm";
import { getServiceById } from "@/lib/actions/service.action";
import { auth } from "@clerk/nextjs";
import React from "react";

type UpdateServiceProps = {
  params: {
    id: string;
  };
};
const UpdateService = async ({ params: { id } }: UpdateServiceProps) => {
  const service = await getServiceById(id);
  const { sessionClaims } = auth(); //imported from clerk
  //extract the userid from the sessionClaims provided by clerk
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Service
        </h3>
      </section>
      <div className="wrapper my-8">
        <ServiceForm userId={userId} type="Update" service={service} serviceId={service._id}/>
      </div>
    </>
  );
};

export default UpdateService;
