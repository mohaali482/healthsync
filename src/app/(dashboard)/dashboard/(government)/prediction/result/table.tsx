import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RecommendationData } from "./page"

export default function TableComponent({ data }: { data: RecommendationData[] }) {
    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Recommendation</CardTitle>
                <CardDescription>Recommendations from our system.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden sm:table-cell text-current">#</TableHead>
                            <TableHead className="hidden sm:table-cell text-current">Name</TableHead>
                            <TableHead className="hidden sm:table-cell text-current">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="hidden sm:table-cell">{idx + 1}</TableCell>
                                <TableCell className="hidden sm:table-cell">{row.name}</TableCell>
                                <TableCell className="hidden md:table-cell">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
