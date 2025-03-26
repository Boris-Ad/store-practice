const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-screen bg-radial-[at_50%_50%] from-sky-200 via-blue-400  to-indigo-600 font-roboto">
      <main className="h-full grid place-content-center">{children}</main>
    </div>
  );
};

export default AuthLayout;
