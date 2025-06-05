import { Pricing, Product } from "@/app/Elements";
import React from "react";
import { ButtonVSL, ContainerSections, Title } from "../components";
import { iconsMap } from "@/app/Elements/types/MapIcons";
import { RiVisaLine, RiMastercardLine, RiPaypalFill } from "react-icons/ri";
import { FaCcAmex, FaGooglePay } from "react-icons/fa6";
import { IoLogoBitcoin } from "react-icons/io";
import { Line } from "../components/common/Line";

interface Props {
  product?: Product;
}

const UniquePlanCard: React.FC<{ product: Product }> = ({ product }) => {
  const plan: Pricing | undefined = product?.pricing?.[0];
  const primaryColor = "#0083ff";

  if (!plan || !plan.points || !plan.payType) return null;

  return (
    <div
      className="w-full max-w-lg mx-auto rounded-3xl p-5 text-white relative flex flex-col gap-5"
      style={{
        backgroundColor: "#000000",
        border: `1px solid ${primaryColor}`,
        boxShadow: `0 0 30px ${primaryColor}33`,
      }}
    >
      <div className="flex items-center gap-5">
        <div
          className="w-10 aspect-square rounded-xl flex justify-center items-center text-white"
          style={{
            background: `linear-gradient(to bottom right, ${primaryColor}, ${primaryColor})`,
          }}
        >
          <span className="text-2xl font-bold text-white">↯</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{plan.title}</h2>
      </div>

      <p className="text-neutral-300">{plan.description}</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-neutral-300">
        {plan.points.map((point, i) => (
          <li key={i} className="flex items-center gap-2 text-left">
            <span style={{ color: primaryColor }}>✔</span>
            {point}
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-5">
        <p className="text-4xl font-bold text-white">
          {plan.currency}
          {plan.price}
        </p>

        <button
          disabled
          className="rounded-full px-6 py-2 font-semibold text-sm uppercase tracking-wider cursor-pointer"
          style={{
            border: `1px solid ${primaryColor}`,
            color: primaryColor,
          }}
        >
          {plan.textButton}
        </button>

        <div className="flex items-center gap-5 opacity-50">
          {plan.payType.map((payType, i) => (
            <span key={i} style={{ color: primaryColor }}>
              {payType.type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const MultiplePlanCard: React.FC<{
  plan: Pricing;
  index: number;
}> = ({ plan, index }) => {
  const primaryColor = "#0083ff";
  const isFeatured = index === 1;
  const icons = Array.isArray(plan.icon)
    ? plan.icon.map((key) => iconsMap[key.icon]).filter(Boolean)
    : [];

  const iconPayTypeMap: { [key: string]: React.ReactNode } = {
    visa: (
      <RiVisaLine
        style={{
          fill: "#fff",
          color: "#fff",
        }}
      />
    ),
    master: (
      <RiMastercardLine
        style={{
          fill: "#fff",
          color: "#fff",
        }}
      />
    ),
    amex: (
      <FaCcAmex
        style={{
          fill: "#fff",
          color: "#fff",
        }}
      />
    ),
    paypal: (
      <RiPaypalFill
        style={{
          fill: "#fff",
          color: "#fff",
        }}
      />
    ),
    gpay: (
      <FaGooglePay
        style={{
          fill: "#fff",
          color: "#fff",
        }}
      />
    ),
    btc: (
      <IoLogoBitcoin
        style={{
          fill: "#fff",
          color: "#fff",
        }}
      />
    ),
  };

  if (!plan || !plan.points || !plan.payType) return null;

  return (
    <div className="relative w-full max-w-sm">
      {/* Íconos grandes con degradado */}
      {icons.length > 0 && (
        <div
          className="absolute flex gap-3 left-1/2 -top-7 md:-top-12
          -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          {/* Definimos los gradientes SVG una vez */}
          <svg width="0" height="0" className="absolute">
            <defs>
              {plan.icon?.map((iconData, i) => (
                <linearGradient
                  key={`gradient-${i}`}
                  id={`gradient-fill-${index}-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="50%" stopColor={iconData.color || "#f0f"} />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              ))}
            </defs>
          </svg>

          {icons.map((IconComponent, i) => (
            <div key={i} className="">
              <IconComponent
                className="text-8xl md:text-9xl"
                style={{
                  fill: `url(#gradient-fill-${index}-${i})`,
                  stroke: `url(#gradient-fill-${index}-${i})`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Card principal */}
      <div
        className={`relative z-10 flex flex-col justify-between p-6 rounded-3xl border text-white transition-all transform hover:scale-105 duration-300 bg-black/50 backdrop-blur-xl ${isFeatured ? "shadow-xl scale-[1.02] border-2" : "shadow-md"}`}
        style={{
          borderColor: primaryColor,
          boxShadow: isFeatured
            ? `0 0 30px ${primaryColor}44`
            : `0 0 20px ${primaryColor}22`,
        }}
      >
        <div className="flex flex-col gap-4 flex-grow">
          <h3 className="text-2xl font-bold">{plan.title}</h3>
          <p className="text-sm text-neutral-400 text-left">
            {plan.description}
          </p>
          <ul className="flex flex-col gap-2 text-sm text-neutral-300">
            {plan.points.map((point, i) => (
              <li key={i} className="flex items-center gap-2 text-left">
                <span style={{ color: primaryColor }}>✔</span>
                <span>
                  {point.split(" ").map((word, j) => {
                    let style = {};

                    if (word.toLowerCase().includes("incluido")) {
                      style = { color: "#facc15" }; // naranja para "Incluido"
                    } else if (/\d/.test(word)) {
                      style = { color: "#4ade80" }; // verde para números
                    }

                    return (
                      <span key={j} style={style}>
                        {word}{" "}
                      </span>
                    );
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 justify-center flex-col">
            {Array.isArray(plan.price) ? (
              <p className="text-4xl font-bold text-white flex items-center">
                <span className="line-through text-neutral-400 text-2xl animate-pulse">
                  {plan.currency}
                  {plan.price[0]}
                </span>
                <span className="mx-2 text-neutral-400 text-2xl">|</span>
                {/* Precio con descuento */}
                <span className="text-4xl font-bold text-white">
                  {plan.currency}
                  {plan.price[1]}
                </span>{" "}
              </p>
            ) : (
              <p className="text-4xl font-bold text-white">
                {plan.currency}
                {plan.price}
              </p>
            )}
            {isFeatured && <p>+ IVA aplicable según tu país</p>}
          </div>

          <ButtonVSL
            PayButton={plan.redirectTo}
            variant={"primary"}
            value={"Obtener"}
          />

          <div className="flex items-center gap-3 text-sm opacity-60 flex-wrap justify-center ">
            {plan.payType?.map(({ icon }, index) => (
              <span
                key={index}
                className="flex items-center justify-center gap-1 text-lg"
                style={{ color: primaryColor, fill: primaryColor }}
              >
                {icon && iconPayTypeMap[icon]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PricingSection: React.FC<Props> = ({ product }) => {
  const hasMultiplePlans = product?.pricing
    ? product.pricing.length > 1
    : false;

  const btcPay =
    product?.payButtons?.find((button) => button.type === "Bitcoin")?.link ||
    "";

  if (!product || !product.pricing) return null;

  return (
    <ContainerSections id="pricing">
      <div className="w-full max-w-7xl flex flex-col gap-40 rounded-2xl justify-center items-center pt-20">
        <Title
          text={
            product
              ? hasMultiplePlans
                ? "Niveles de Protección"
                : "Plan de acceso"
              : "Niveles de Protección"
          }
        />

        <div className="w-full flex flex-wrap justify-center gap-20">
          {product &&
            (hasMultiplePlans ? (
              product.pricing.map((plan, i) => (
                <MultiplePlanCard key={i} plan={plan} index={i} />
              ))
            ) : (
              <UniquePlanCard product={product} />
            ))}
        </div>
      </div>

      <Title text="Otros métodos de acceso" />
      <div className="">
        <ButtonVSL
          PayButton={btcPay}
          value="Bitcoin"
          variant="secondary"
          ico
          className="shadow-[0_0_10px_-2px_#F7931A] hover:shadow-[0_0_20px_-3px_#F7931A]"
          blank
        />
      </div>
      <Line color="#0083ff" />
    </ContainerSections>
  );
};
