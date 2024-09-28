import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from "uuid";
export class paymentDto{

    @ApiProperty({
        description: 'This is the payment date',
        example: '2022-01-01'
    })
    paymentDay: Date

    @ApiProperty({
        description: 'This is the ammount of money you payed',
        example: '20.00'
    })
    payment: number

    @ApiProperty({
        description: 'This is te id of user that makes that payment',
        example: '03bd72c2-7f46-466e-a815-91cff052faba'    
    })
    userId: string=uuid()

    @ApiProperty({
        description: 'This is the id of subscription',
        example: '1'    
    })
    subscriptionid: number

    @ApiProperty({
        description: 'This is the % of discount applied, for 10% put 10',
        example: '10'    
    })
    discount: number
}

