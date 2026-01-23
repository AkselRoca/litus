import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FileText, Users, Settings, LogOut, Home, BarChart, Briefcase, Image, TrendingUp } from 'lucide-react'
import { signOut } from '@/auth'

async function SignOutButton() {
    return (
        <form
            action={async () => {
                'use server'
                await signOut({ redirectTo: '/login-admin' })
            }}
        >
            <button
                type="submit"
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
                <LogOut className="w-5 h-5" />
                Déconnexion
            </button>
        </form>
    )
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    // If not logged in, redirect to login (but this layout won't apply to login page)
    if (!session?.user) {
        redirect('/login-admin')
    }

    const navItems = [
        { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/portfolio', icon: Briefcase, label: 'Portfolio' },
        { href: '/admin/media', icon: Image, label: 'Médias' },
        { href: '/admin/leads', icon: Users, label: 'Leads' },
        { href: '/admin/market-analysis', icon: TrendingUp, label: 'Analyses Marché' },
        { href: '/admin/blog', icon: FileText, label: 'Blog' },
        { href: '/admin/analytics', icon: BarChart, label: 'Analytics' },
        { href: '/admin/settings', icon: Settings, label: 'Paramètres' },
    ]

    return (
        <div className="min-h-screen bg-gray-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-white/10 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin" className="text-2xl font-bold text-primary">
                        Litus Admin
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* User section */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white font-bold">
                            {session.user.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                            <div className="text-white font-medium">{session.user.name}</div>
                            <div className="text-gray-500 text-sm">{session.user.email}</div>
                        </div>
                    </div>
                    <SignOutButton />
                    <Link
                        href="/"
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors mt-2"
                    >
                        <Home className="w-5 h-5" />
                        Voir le site
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    )
}
