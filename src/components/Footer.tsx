function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Made with ❤️ by{" "}
          <a
            href="https://vegaronel.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Ronel Vega
          </a>
        </p>
        <p className="text-xs mt-2 text-gray-400">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
