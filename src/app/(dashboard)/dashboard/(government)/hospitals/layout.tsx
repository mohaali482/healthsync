export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <h1 className="text-2xl font-bold mb-2">Hospitals</h1>
            {children}
        </>
    )
}