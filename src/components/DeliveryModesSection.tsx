import { motion } from "framer-motion";
import { Monitor, Building2, BookOpen, User, Plane, Building } from "lucide-react";
import { deliveryModes } from "@/data/courses";

const iconMap: Record<string, React.ElementType> = {
  "live-online": Monitor,
  "classroom": Building2,
  "self-paced": BookOpen,
  "1-on-1": User,
  "fly-me": Plane,
  "corporate": Building,
};

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
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-foreground">
            Flexible <span className="text-primary">Learning Options</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the training delivery method that works best for you or your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {deliveryModes.map((mode, i) => {
            const Icon = iconMap[mode.id] || Monitor;
            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">{mode.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{mode.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DeliveryModesSection;
