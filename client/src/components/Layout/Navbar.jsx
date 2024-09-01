export function Navbar() {
  return (
    <header className="header">
      <div class="navbar">
        <a href="/" className="logo">headwise</a>
        <a href="/about">About</a>
        <div class="subnav">
          <button class="subnavbtn"><a href="/categories">Worksheets</a></button>
          <div class="subnav-content">
            <a href="#company">Company</a>
            <a href="#team">Team</a>
            <a href="#careers">Careers</a>
          </div>
        </div>
        <div class="subnav">
          <button class="subnavbtn">Journal</button>
          <div class="subnav-content">
            <a href="#bring">Bring</a>
            <a href="#deliver">Deliver</a>
            <a href="#package">Package</a>
            <a href="#express">Express</a>
          </div>
        </div>
        <div class="subnav">
          <button class="subnavbtn">Explore</button>
          <div class="subnav-content">
            <a href="#link1">Link 1</a>
            <a href="#link2">Link 2</a>
            <a href="#link3">Link 3</a>
            <a href="#link4">Link 4</a>
          </div>
        </div>
        <a href="/profile">Login</a>
      </div>
    </header>
  );
}
