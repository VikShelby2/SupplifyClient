import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import { cn } from '../../../lib/utils'

const FormCard = ({children , cardStyle , contentStyle ,cardHeader , cardTitle , headerStyle , titleStyle , cardFooter , footerStyle}) => {
  return (
    <Card className={cn(
        "" , cardStyle
        )}>
        {cardHeader &&(
          <CardHeader  className={cn(
        "" , headerStyle
        )}>
             <CardTitle className={cn(
        "" , titleStyle
        )}>
              {cardTitle}
             </CardTitle>
          </CardHeader>
        )}
    <CardContent className={cn(
    "" , contentStyle
    )}>
    {children}
    </CardContent>
    {cardFooter && (
      <CardFooter className={cn(
    "" , footerStyle
    )}>
      {cardFooter}
      </CardFooter>
    )}
    </Card>
  )
}

export default FormCard
