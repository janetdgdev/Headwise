export function Carousel() {
  document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel-container");
    const leftArrow = document.querySelector(".arrow-div-left");
    const rightArrow = document.querySelector(".arrow-div-right");
    const slide = document.querySelector(".slideTemplate");

    carousel.scrollLeft = 0;

    function getScrollAmount() {
        return carousel.clientWidth;
    }

    rightArrow.addEventListener("click", function () {
      carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    leftArrow.addEventListener("click", function () {
      carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
  });

  return (
    <div>
      <div className="containerVertical">
        <div className="slideContainer">
          <div className="carousel-container">
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1545431781-3e1b506e9a37?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1575550845729-c479d1947fc9?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1614854262318-831574f15f1f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1545431781-3e1b506e9a37?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1614854262318-831574f15f1f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1575550845729-c479d1947fc9?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1545431781-3e1b506e9a37?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="slideTemplate">
              <img
                src="https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="carousel-controller">
          <div className="arrow-div-left">
            <img
              className="arrow-left"
              src="https://www.htmlcssbuttongenerator.com/image/arrowLeft.png"
            />
          </div>
          <div className="arrow-div-right">
            <img
              className="arrow-right"
              src="https://www.htmlcssbuttongenerator.com/image/arrowLeft.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
