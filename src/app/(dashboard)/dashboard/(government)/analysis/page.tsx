import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getReportDiseases } from "@/data/reports"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Analysis",
}

export default async function Analysis() {
    const diseases = await getReportDiseases();

    return (
        <div>
            <Table>
                <TableCaption>A list of diseases.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Disease Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Report counts</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {diseases.map((disease, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="font-medium">{disease.name}</TableCell>
                            <TableCell>{disease.description}</TableCell>
                            <TableCell>{disease.reports.length}</TableCell>
                            <TableCell className="text-right"><Link href={`/dashboard/analysis/${disease.id}`}>Analysis</Link></TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}