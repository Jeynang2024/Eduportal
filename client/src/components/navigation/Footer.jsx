const Footer = () => {
  return (
    <footer className="bg-[#004d7a] text-white text-sm py-3 px-4 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="mb-1 md:mb-0">© 2025 Student Portal. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#contact" className="hover:underline">Contact Us</a>
          <span>Helpline: 1800-123-456</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
