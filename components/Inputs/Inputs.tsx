import React from "react";
import {Input} from "@nextui-org/react";
import {EyeFilledIcon} from "./EyeFilledIcon";
import {EyeSlashFilledIcon} from "./EyeSlashFilledIcon";

interface datatype {
  datatype: "email"| "password";
  setEmail?: (para: any) => void;
  setPassword?: (para: any) => void;
}
export default function InputsPassword(props: datatype) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e : any) => {
    props?.setEmail(e.target.value!)
  }
  const handleChange1 = (e : any) => {
    props?.setPassword(e.target.value!)
  }

  return (
    <>
    {
      props.datatype === "email" ? (
        <Input
          type="email"
          label="Email"
          variant="bordered"
          className="max-w-xs w-[90%]"
          onChange={(e) => handleChange(e)}
        />
      ) : props.datatype === "password" ? (
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          onChange={(e) => handleChange1(e)}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-xs w-[90%]"
      />
      ) : null
    }
    </>
  );
}
