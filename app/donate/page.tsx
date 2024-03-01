import React from 'react'
import Basecontent from "@/components/basecontent";
import { Metadata } from 'next';

import SectionDonate from "./SectionDonate";

export const metadata: Metadata = {
    title: "Payment Donation",
};

export default function DonatePage({ params }: any) {
    return (
        <Basecontent>
            <SectionDonate />
        </Basecontent>
    )
}

