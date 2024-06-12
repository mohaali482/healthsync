import { Tailwind, Html, Head, Body } from "@react-email/components"

export default function EmailTemplate({ item, currentLevel, thresholdLevel, timestamp, link, personName }: { item: string, currentLevel: number, thresholdLevel: number, timestamp: string, link: string, personName: string }) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <Body>
                    <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-md max-w-md mx-auto">
                        <div className="space-y-4">
                            <div className="bg-red-500 text-white font-medium px-4 py-2 rounded-md">Stock Level Alert</div>
                            <h2 className="text-2xl font-bold">Stock Level Below Threshold</h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                <p>Dear {personName},</p>

                                The stock level for <span className="font-bold">{item}</span> has fallen below the threshold. The current level is <span className="font-bold">{currentLevel}</span>, while the threshold level is <span className="font-bold">{thresholdLevel}</span>.
                                This occurred on <span className="font-bold">{timestamp}</span>. Please review the stock levels and make necessary adjustments to ensure the hospital can meet patient needs.
                            </p>
                            <a
                                href={link}
                                className="inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Review Stock Levels
                            </a>
                        </div>
                    </div>
                </Body>
            </Html>
        </Tailwind>
    )
}