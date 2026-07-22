export default function Preloader() {
    return (
        <>
            {/*  Start Preloader Area   */}
            <div className="rbt-preloader">
                <div className="rbt-preloader-inner">
                    <svg className="rbt-preloader-cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128"
                        width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
                            <g className="rbt-preloader-cart-track" stroke="hsla(0,10%,10%,0.1)">
                                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                                <circle cx="43" cy="111" r="13" />
                                <circle cx="102" cy="111" r="13" />
                            </g>
                            <g className="rbt-preloader-cart-lines" stroke="currentColor">
                                <polyline className="rbt-preloader-cart-top"
                                    points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" strokeDasharray="338 338"
                                    strokeDashoffset="-338" />
                                <g className="rbt-preloader-cart-wheel1" transform="rotate(-90,43,111)">
                                    <circle className="rbt-preloader-cart-wheel-stroke" cx="43" cy="111" r="13"
                                        strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                </g>
                                <g className="rbt-preloader-cart-wheel2" transform="rotate(90,102,111)">
                                    <circle className="rbt-preloader-cart-wheel-stroke" cx="102" cy="111" r="13"
                                        strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                </g>
                            </g>
                        </g>
                    </svg>
                    <div className="preloader-text">
                        <p className="preloader-msg">Gearing up something amazing for you…</p>
                        <p className="preloader-msg preloader-msg--last">Still waiting? Magic takes a moment! ✨</p>
                    </div>
                </div>
            </div>
            {/*  End Preloader Area  */}
        </>
    );
}