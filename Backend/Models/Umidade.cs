namespace Estufa.Models
{
    public class Umidade
    {
        public int Id { get; set; }
        public double UmidadeAtual { get; set; }  // Nível de umidade atual
        public double UmidadeIdeal { get; set; }  // Nível ideal de umidade
        public DateTime UltimaMedicao { get; set; }  // Data e hora da última medição
    }
}
