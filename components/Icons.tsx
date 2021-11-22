export const LoadingIco = () => (
  <svg viewBox="0 0 24 24" className="telegram-login-widget__icon">
    <defs>
      <linearGradient x1="28.154%" y1="63.74%" x2="74.629%" y2="17.783%" id="a">
        <stop stopColor="currentColor" offset="0%"></stop>
        <stop stopColor="#fff" stopOpacity="0" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g transform="translate(2)" fill="none">
      <circle stroke="url(#a)" strokeWidth="2" cx="10" cy="12" r="10"></circle>
      <path d="M10 2C4.477 2 0 6.477 0 12" stroke="currentColor" strokeWidth="2"></path>
    </g>
    <animateTransform
      attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 0 0"
      to="360 0 0"
      dur="0.5s"
      repeatCount="indefinite"
    />
  </svg>
)

export const TelegramIco = () => (
  <svg viewBox="0 0 24 24" className="telegram-login-widget__icon">
    <path d="M1.95617 10.827C7.73382 8.2612 11.5865 6.56964 13.5142 5.75237C19.0181 3.41888 20.1618 3.01353 20.9072 3.00014C21.0712 2.9972 21.4378 3.03862 21.6752 3.23501C21.8757 3.40085 21.9309 3.62487 21.9573 3.7821C21.9837 3.93933 22.0166 4.29751 21.9904 4.57738C21.6922 7.77174 20.4016 15.5236 19.745 19.1014C19.4672 20.6153 18.9162 20.9393 18.3866 20.9889C17.2357 21.0969 16.3657 20.3972 15.251 19.6524C13.5066 18.4869 12.8655 18.173 11.1723 17.0356C9.21554 15.7213 10.2831 15.0333 11.3983 13.8527C11.6901 13.5437 16.7972 8.73063 16.8953 8.30413C16.9076 8.25079 16.7396 7.71746 16.6237 7.61247C16.5078 7.50748 16.3368 7.54338 16.2133 7.57194C16.0384 7.61241 13.2518 9.48981 7.85356 13.2041C7.0626 13.7578 6.34617 14.0275 5.70427 14.0134C4.99663 13.9978 3.63541 13.6055 2.62348 13.2702C1.38232 12.859 0.924159 12.6653 1.01006 11.9669C1.0548 11.6031 1.37017 11.2232 1.95617 10.827V10.827Z" fill="white" />
  </svg>
)
