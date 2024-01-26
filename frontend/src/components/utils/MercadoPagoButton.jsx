import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago("TEST-ea76c462-7363-4745-b32c-555a9663d47a");

function MercadoPagoButton(data) {
  const { id } = data.preferenceId;
  
  return (
    <div id="wallet_container">
      <Wallet
        initialization={{ preferenceId: id }}
        customization={{
          texts: { valueProp: "smart_option" },
          visual: {
            buttonBackground: "black",
            valuePropColor: "grey",
            borderRadius: "25px",
          },
        }}
      />
    </div>
  );
}

export { MercadoPagoButton };
