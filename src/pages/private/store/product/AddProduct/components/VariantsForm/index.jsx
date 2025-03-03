import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../../../../components/ui/card";
import OptionKanban from "./components/optiopnKanban";
import DynamicOptions from "./components/dynamicOption";
import FormLabel from "../label-form";


export default function VariantsForm({
  variants ,
  handleVariantChange ,
  setAddedVariants ,
  addedVariants

}){
    return(
        <Card x-chunk="dashboard-07-chunk-1" class="bg-white shadow-input rounded-[.75rem] gap-2">
      
        <CardContent className="pb-0 pt-0 mt-[1.3rem]">
 
          <FormLabel className={`text-black ${variants.length > 0  ? 'px-3 mb-4' : 'px-2'} `}>Variants</FormLabel>
          
       <OptionKanban
variants={variants.variants}
setVariants={handleVariantChange}
setAddedVariants={setAddedVariants}
addedVariants={addedVariants}
       />
    
    
         </CardContent>
             <DynamicOptions

              addedVariants={addedVariants}
              setAddedVariants={setAddedVariants}
             />
          
      </Card>
    )
}