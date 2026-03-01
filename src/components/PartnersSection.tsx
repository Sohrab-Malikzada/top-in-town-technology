import { motion } from "framer-motion";
import { partners } from "@/data/courses";

const PartnersSection = () => {
  return (
    <section className="py-16 border-t border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl font-bold mb-2">
            Official Training <span className="text-gradient">Partners</span>
          </h2>
          <p className="text-sm text-muted-foreground">Authorized training partner for the world's leading technology companies</p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-6 py-3 bg-card/50 border border-border/30 rounded-lg text-muted-foreground font-medium text-sm hover:text-primary hover:border-primary/20 transition-all cursor-default"
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
