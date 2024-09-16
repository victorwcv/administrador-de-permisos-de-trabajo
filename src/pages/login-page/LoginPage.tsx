import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

function LoginPage() {
  const [error, setError] = useState<boolean | string>(false);
  const { setUser } = useUser();
  const mailKey = import.meta.env.VITE_MAIL_KEY;
  const passwordKey = import.meta.env.VITE_PASS_KEY;
  console.log(mailKey, passwordKey);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
    if (values.email === mailKey && values.password === passwordKey) {
      setUser({ email: values.email });
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen min-h-[720px]">
      <div className="absolute inset-0 bg-white/40 -z-10" />
      <img
        src="/login-bg.jpeg"
        alt="bg"
        className="w-full h-full absolute object-cover -z-20"
      />
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg p-8 max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-500">Bienvenido</h2>
          <p className="mt-2 text-sm">Accede a tu cuenta</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomInput
            label={"Correo Electrónico"}
            name={"email"}
            register={register("email", {
              required: "Ingrese un correo",
              validate: {
                validEmail: (value) =>
                  /\S+@\S+\.\S+/.test(value) || "Ingrese un correo válido", // Validación de formato de correo
              },
            })}
            errors={errors}
            placeholder="admin@mail.com"
          />

          <CustomInput
            type="password"
            label={"Contraseña"}
            name={"password"}
            register={register("password", {
              required: "Ingrese una contraseña",
            })}
            errors={errors}
            placeholder=""
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center py-2">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-accent-500 focus:ring-accent-400 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm">
                Recuérdame
              </label>
            </div>

            <div className="text-sm">
              <p className="text-red-600">{error}</p>
            </div>
          </div>

          <div>
            <CustomButton
              label={"Ingresar"}
              type={"submit"}
              btnStyles={"w-full"}
            />
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>
              ¿Perdiste tu contraseña?
              <a
                href="#"
                className="font-medium text-accent-500 hover:text-accent-400 ml-2"
              >
                Soporte IT
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
