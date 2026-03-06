import { motion } from "framer-motion";
import { partners } from "@/data/courses";

const PartnersSection = () => {
  return (
    <section className="py-16 border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl font-bold mb-2 text-foreground">
            Official Training <span className="text-primary">Partners</span>
          </h2>
          <p className="text-sm text-muted-foreground">Authorized training partner for the world's leading technology companies</p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-6 py-3 bg-card border border-border rounded-lg text-muted-foreground font-medium text-sm hover:text-primary hover:border-primary/30 hover:shadow-card transition-all cursor-default"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
