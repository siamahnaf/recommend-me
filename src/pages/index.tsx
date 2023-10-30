import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

//Components
import Autocomplete from "@/Components/Common/Autocomplete";

//Query
import { useMutation } from "@tanstack/react-query";
import { GET_RECOMMEND_MOVIES } from "@/Query/Function/movies";

//Interface
interface Inputs {
  movie_name: string;
}

const Home = () => {
  //Form Initializing
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    trigger
  } = useForm<Inputs>();

  //Form Data
  const name = watch().movie_name;

  //Query
  const { mutate, data, isPending, error } = useMutation({
    mutationKey: ["recommend"], mutationFn: (formData: Inputs) => GET_RECOMMEND_MOVIES(formData)
  });

  //Submit Handler
  const onSubmit: SubmitHandler<Inputs> = (value) => {
    mutate(value)
  }

  return (
    <div className="w-[960px] mx-auto py-14">
      <h3 className="text-3xl font-bold mb-3">Movie Recommended System</h3>
      <p className="text-base mb-6">Select a movies and get recommend movies</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          errors={errors}
          onSelect={(e) => {
            setValue("movie_name", e.title as string)
            trigger("movie_name")
          }}
        />
        <div className="mt-5 relative w-max">
          <button className={`border border-slate-600 px-3 py-1.5 rounded-md font-medium ${!name && "opacity-25"}`} type="submit" disabled={!name}>
            Recommend
          </button>
          {isPending &&
            <div className="absolute top-1/2 -translate-y-1/2 -right-10">
              <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
            </div>
          }
        </div>
      </form>
      <div>
        {data?.code == 404 &&
          <p className="text-center mt-3 text-orange-400">{data.message}</p>
        }
      </div>
      <div className="grid grid-cols-5 gap-2 mt-5">
        {data?.results &&
          data.results.map((item, i) => (
            <div className="bg-slate-600 rounded-lg overflow-hidden" key={i}>
              <Image
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                width={180}
                height={300}
                alt={item.title}
                className="w-full"
                priority
              />
              <h4 className="text-base line-clamp-2 mt-2 px-2 py-1.5">{item.title}</h4>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;