import React from 'react'
import { UserGeneratorProps } from './UserGenerator.types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function UserGenerator(props: UserGeneratorProps) {
    const { setUserTypeSelected } =props;
  return (
    <div className='p-4 bg-slate-100 rounded-md shadow-md'>
        <p className='mb-4 text-slate-500'>What do you want to generate?</p>
        <RadioGroup
            defaultValue='username'
            onValueChange={(value) => setUserTypeSelected(value)}
        >
        <div className='flex items-center space-x-2'>
            <RadioGroupItem value='username' id='r3' />
            <label htmlFor="r3">Username</label>
        </div>
        <div className='flex items-center space-x-2'>
            <RadioGroupItem value='email' id='r4' />
            <label htmlFor="r4">Email</label>
        </div>
        </RadioGroup>
    </div>
  )
}
