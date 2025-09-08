import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "google") {
        // send google access_token to Django
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/auth/google/",
            { access_token: account.access_token }
          );
          token.access = response.data.access;
          token.refresh = response.data.refresh;
        } catch (err) {
          console.error("Django exchange failed", err);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.access = token.access;
      session.refresh = token.refresh;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
