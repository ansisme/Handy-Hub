import { IService } from "@/lib/database/models/service.model";
import React from "react";
import Card from "./Card";
type CollectionProps = {
  data: IService;
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType?: "Services_Offered" | "My_Services" | "All_Services";
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};
const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  limit,
  page,
  totalPages,
  urlParamName,
}: CollectionProps) => {
  return(
  <>
  {data.length > 1 ? (
    <div className="flex flex-col items-center gap-10">
        <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((service: IService)=>{
                const hasOrderLink = collectionType === "Services_Offered"
                const hidePrice = collectionType === "My_Services";
                return (
                    <li key={service._id} className="flex justify-center">
                        <Card service={service} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                    </li>
                )
            })}
        </ul>
        {data[0].serviceTitle}
    </div >
  ): (
  <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
    <h3 className="p-bold-20 md:h-5-bold">{emptyTitle}</h3>
    <p className="p-regular-14">{emptyStateSubtext}</p>
  </div>
  )}
  </>
)};

export default Collection;