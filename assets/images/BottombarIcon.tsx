import  { Svg, Path } from "react-native-svg";

interface BottombarIconProps {
  color: string;
  width: number;
  height: number;
}



const BottombarIcon = ({ color, width, height }: BottombarIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 435 137" fill="none" >
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M218 73C240.091 73 258 55.0914 258 33C258 28.8382 261.091 25 265.253 25H395C400.523 25 405 29.4772 405 35V84V92V102H395H387H48H40H30V92V84V35C30 29.4772 34.4772 25 40 25H170.747C174.909 25 178 28.8382 178 33C178 55.0914 195.909 73 218 73Z" fill={color}/>
    </Svg>
  );
}

export default BottombarIcon;