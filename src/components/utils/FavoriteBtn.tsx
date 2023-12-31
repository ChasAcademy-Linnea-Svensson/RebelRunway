import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { api } from "~/utils/api";
import Loading from "./Loading";
import { useSession } from "next-auth/react";

type FavoriteBtnProps = {
  productId: string;
};

const FavoriteBtn = ({ productId }: FavoriteBtnProps) => {
  const ctx = api.useContext();
  const { data: sessionData } = useSession();
  const favoriteProducts =
    sessionData?.user && api.favorite.getFavoriteProducts.useQuery().data;
  const [favorited, setFavorited] = useState(false);

  const { mutate, isLoading } = api.favorite.addOrRemoveFavorites.useMutation({
    onMutate: () => {
      setFavorited(!favorited);
    },
    onSuccess: () => {
      ctx.favorite.getFavoriteProducts.invalidate();
    },
  });

  const checkIfFavorited = () => {
    favoriteProducts?.forEach((product) => {
      product.product.id === productId && setFavorited(true);
    });
  };

  useEffect(() => {
    setFavorited(false);
    checkIfFavorited();
  }, [favoriteProducts]);

  return (
    <button
      onClick={() => mutate({ productId })}
      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-50 bg-white"
      disabled={!sessionData?.user}
    >
      {isLoading && <Loading fillColor="fill-red-600" />}
      <p className="text-black">
        {!isLoading &&
          (favorited ? (
            <AiFillHeart color="red" size={24} />
          ) : (
            <AiOutlineHeart color="red" size={26} />
          ))}
      </p>
    </button>
  );
};

export default FavoriteBtn;
