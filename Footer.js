import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-black py-10 px-6 pt-10 text-white" >
      <h2 className="text-center text-3xl font-bold mb-10 ">Movie Categories</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 text-sm">

        <div>
          <h1 className="font-semibold mb-3 ">Popular</h1>
          <ul className="space-y-2 opacity-80">
            <li>Action</li>
            <li>Comedy</li>
            <li>Horror</li>
            <li>Fantasy</li>
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-3">Top Rated</h1>
          <ul className="space-y-2 opacity-80">
            <li>Drama</li>
            <li>Thriller</li>
            <li>Sci-Fi</li>
            <li>Romance</li>
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-3">Upcoming</h1>
          <ul className="space-y-2 opacity-80">
            <li>2025 Movies</li>
            <li>New Trailers</li>
            <li>Announcements</li>
            <li>Teasers</li>
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-3">Genres</h1>
          <ul className="space-y-2 opacity-80">
            <li>Adventure</li>
            <li>Mystery</li>
            <li>Crime</li>
            <li>Animation</li>
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-3">TV Shows</h1>
          <ul className="space-y-2 opacity-80">
            <li>Trending</li>
            <li>Top Picks</li>
            <li>New Episodes</li>
            <li>Web Series</li>
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-3">Support</h1>
          <ul className="space-y-2 opacity-80">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Feedback</li>
            <li>Report Issue</li>
          </ul>
        </div>
      </div>
         <div className="flex justify-center gap-3 pt-20 ">  {/*here i will keep my social acounts div */}
          <a
        href="https://www.linkedin.com/in/rishika-verma-4561502a6/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-500 "
      ><FaLinkedin size={40}></FaLinkedin></a>
       
        <a
        href="https://github.com/vermarishika24598-blip"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-500"
      ><FaGithub size={40}></FaGithub> 
      </a>

      <a href="https://x.com/RishikaVer19716"
       target="_blank"
       rel="noopener noreferrer" 
       className="hover:text-blue-500">
        <FaTwitter size={40}></FaTwitter> 
       </a>
      </div>
      {/* COPYRIGHT */}
      <p className="text-center mt-10 opacity-60">
        © 2025 IMDB Clone — All Rights Reserved
      </p>
      
    </footer>
  );
}
