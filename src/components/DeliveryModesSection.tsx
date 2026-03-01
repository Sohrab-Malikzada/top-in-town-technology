import { motion } from "framer-motion";
import { deliveryModes } from "@/data/courses";

const DeliveryModesSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Flexible <span className="text-gradient">Learning Options</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the training delivery method that works best for you or your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deliveryModes.map((mode, i) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-glow transition-all duration-300 group"
            >
              <span className="text-3xl mb-4 block">{mode.icon}</span>
              <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">{mode.name}</h3>
              <p className="text-sm text-muted-foreground">{mode.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryModesSection;
