import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function CardComponent({ title, value, description }: { title: string; value: string; description: string }) {
    return (
        <Card className="lg:min-w-64">
            <CardHeader className="pb-2">
                <CardDescription className="text-current font-bold">{title}</CardDescription>
                <CardTitle className="text-4xl text-current">{value}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-current">{description}</div>
            </CardContent>
        </Card>
    )
}
