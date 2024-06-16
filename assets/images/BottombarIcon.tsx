import Svg, { Path } from "react-native-svg";

interface BottombarIconProps {
  color: string;
  width: number;
  height: number;
}

// <!-- <svg width="435" height="137" viewBox="0 0 435 137" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g filter="url(#filter0_d_761_1382)">
// <path fill-rule="evenodd" clip-rule="evenodd" d="M218 73C240.091 73 258 55.0914 258 33C258 28.8382 261.091 25 265.253 25H395C400.523 25 405 29.4772 405 35V84V92V102H395H387H48H40H30V92V84V35C30 29.4772 34.4772 25 40 25H170.747C174.909 25 178 28.8382 178 33C178 55.0914 195.909 73 218 73Z" fill="#34323B"/>
// </g>
// <defs>
// <filter id="filter0_d_761_1382" x="0" y="0" width="435" height="137" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
// <feOffset dy="5"/>
// <feGaussianBlur stdDeviation="15"/>
// <feComposite in2="hardAlpha" operator="out"/>
// <feColorMatrix type="matrix" values="0 0 0 0 0.676921 0 0 0 0 0.0189062 0 0 0 0 0.0189062 0 0 0 1 0"/>
// <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_761_1382"/>
// <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_761_1382" result="shape"/>
// </filter>
// </defs>
// </svg> -->



const BottombarIcon = ({ color, width, height }: BottombarIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 435 137" fill="none" >
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M218 73C240.091 73 258 55.0914 258 33C258 28.8382 261.091 25 265.253 25H395C400.523 25 405 29.4772 405 35V84V92V102H395H387H48H40H30V92V84V35C30 29.4772 34.4772 25 40 25H170.747C174.909 25 178 28.8382 178 33C178 55.0914 195.909 73 218 73Z" fill={color}/>
    </Svg>
  );
}

export default BottombarIcon;