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
                className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors text-sm"
            >
                <LogOut className="w-[18px] h-[18px]" />
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
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] flex">
            {/* Sidebar */}
            <aside className="w-60 bg-white dark:bg-[#111] border-r border-gray-200 dark:border-white/10 flex flex-col sticky top-0 h-screen">
                {/* Logo */}
                <div className="px-5 py-5 border-b border-gray-200 dark:border-white/10">
                    <Link href="/admin" className="text-xl font-bold text-primary">
                        Litus Admin
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors text-sm"
                        >
                            <item.icon className="w-[18px] h-[18px]" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* User section */}
                <div className="px-3 py-4 border-t border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                            {session.user.name?.charAt(0) || 'A'}
                        </div>
                        <div className="min-w-0">
                            <div className="text-gray-900 dark:text-white font-medium text-sm truncate">{session.user.name}</div>
                            <div className="text-gray-400 dark:text-gray-500 text-xs truncate">{session.user.email}</div>
                        </div>
                    </div>
                    <SignOutButton />
                    <Link
                        href="/"
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors text-sm mt-1"
                    >
                        <Home className="w-[18px] h-[18px]" />
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
