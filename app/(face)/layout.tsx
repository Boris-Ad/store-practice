import { Navbar } from "./_components/Navbar"

const Layout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <div className="h-screen flex flex-col bg-face-background text-face-foreground font-open_sans">
        <Navbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    )
}

export default Layout