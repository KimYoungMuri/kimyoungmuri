import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false
      
      // Create user in Supabase if they don't exist
      const { data: existingUser } = await supabase
        .from('users')
        .select()
        .eq('email', user.email)
        .single()

      if (!existingUser) {
        await supabase.from('users').insert([
          {
            email: user.email,
            name: user.name,
          }
        ])
      }

      return true
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
