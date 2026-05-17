export const getTaskScore = (task) => {
  if (task.priority === "High") return 3;
  if (task.priority === "Medium") return 2;
  return 1;
};

export const getWeeklyChartData = (tasks) => {
  // your logic here
  
  const now = new Date();

  return [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(now.getDate() - i);

    const dateStr = d.toLocaleDateString();
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });

    const dayTasks = tasks.filter(t => t.date === dateStr && t.completed);

    return {
      day: dayName,

      Work: dayTasks
        .filter(t => t.category === "Work")
        .reduce((sum, t) => sum + getTaskScore(t), 0),

      Health: dayTasks
        .filter(t => t.category === "Health")
        .reduce((sum, t) => sum + getTaskScore(t), 0),

      Study: dayTasks
        .filter(t => t.category === "Study")
        .reduce((sum, t) => sum + getTaskScore(t), 0),
    };
  }).reverse();
};

export const getLifeRadarData = (tasks) => {
  // your fixed radar logic here
    const now = new Date();
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(now.getDate() - i);
    return d.toLocaleDateString();
  });

  const weekTasks = tasks.filter(
    t => last7Days.includes(t.date) && t.completed
  );

  const domainScores = {
    Health: 0,
    Productivity: 0,
    Skills: 0,
    Money: 0,
    PersonalGrowth: 0,
    Relationships: 0
  };
  const max = Math.max(...Object.values(domainScores), 1);
  weekTasks.forEach(task => {
    const score = getTaskScore(task);

    if (task.category === "Health") domainScores.Health += score;
    if (task.category === "Work") domainScores.Productivity += score;
    if (task.category === "Study") domainScores.Skills += score;

    // future-ready mappings
    if (task.category === "Finance") domainScores.Money += score;
    if (task.category === "Spiritual") domainScores.PersonalGrowth += score;
    if (task.category === "Family") domainScores.Relationships += score;
  });

  return Object.keys(domainScores).map(key => ({
    subject: key,
    value: (domainScores[key] / max) * 10 // normalize to 10
  }));


};
